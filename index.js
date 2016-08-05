exports.reduceSessions = (state, action) => {
  switch (action.type) {
    case 'ALTERNATE_SCREEN_ON':
      return state.merge({
        sessions: {
          [action.uid]: {
            inAlternateScreen: true
          }
        }
      }, { deep: true });
    case 'ALTERNATE_SCREEN_OFF':
      return state.merge({
        sessions: {
          [action.uid]: {
            inAlternateScreen: false
          }
        }
      }, { deep: true });
  }
  return state;
};

function alternateScrollDown(lines) {
	return (dispatch, getState) => {
		dispatch({
			type: 'ALTERNATE_SCROLL_DOWN',
      lines: lines,
			effect () {
				const { sessions } = getState();
				const uid = sessions.activeUid;
				if (sessions.sessions[uid].inAlternateScreen){
					window.rpc.emit('data', { uid:uid, data:'\u001bOB'.repeat(lines) });
				}
			}
		});
	};
}

function alternateScrollUp(lines) {
	return (dispatch, getState) => {
		dispatch({
			type: 'ALTERNATE_SCROLL_UP',
      lines: lines,
			effect () {
				const { sessions } = getState();
				const uid = sessions.activeUid;
				if (sessions.sessions[uid].inAlternateScreen){
					window.rpc.emit('data', { uid:uid, data:'\u001bOA'.repeat(lines) });
				}
			}
		});
	};
}

exports.mapTermsDispatch = (dispatch, map) => {
	return Object.assign(map, {
		alternateScrollDown: (lines) => {
			dispatch(alternateScrollDown(lines));
		},
		alternateScrollUp: (lines) => {
			dispatch(alternateScrollUp(lines));
		},
	});
};

exports.getTermProps = (uid, parentProps, props) => {
  var inAlternateScreen = false;
  parentProps.sessions.forEach((session) => {
  	if (uid == session.uid) {
  		inAlternateScreen = session.inAlternateScreen;
  	}
  });
  return Object.assign(props, {
  	inAlternateScreen: inAlternateScreen,
    alternateScrollDown: parentProps.alternateScrollDown,
    alternateScrollUp: parentProps.alternateScrollUp
  });
}

/*
 *  extends hterm object to set `setWindowTitle` method and run onTitle event.
 */
exports.decorateTerm = (Term, {React}) => {
	return class extends React.Component {
		onTerminal(term){
			this.term = term;
		}

		componentWillReceiveProps(newProps){
			if (newProps.inAlternateScreen != this.props.inAlternateScreen) {
		    this.term.prefs_.set('scroll-wheel-move-multiplier', newProps.inAlternateScreen ? 0 : 1);
			}
		}

		render() {
			const originalOnTerminal = this.props.onTerminal;
			const onTerminal = (term) => {
				this.onTerminal(term);
				if (originalOnTerminal) originalOnTerminal(term);
			};
			const onWheel = (e) => {
				if (this.props.inAlternateScreen) {
					if (e.wheelDeltaY < 0 ){
						this.props.alternateScrollDown(Math.ceil(-e.wheelDeltaY / 300));
					} else if (e.wheelDeltaY > 0 ){
						this.props.alternateScrollUp(Math.ceil(e.wheelDeltaY / 300));
					}
					e.preventDefault();
				}
			};

			const props = Object.assign({}, this.props, {onWheel, onTerminal});

			return React.createElement(Term, props);
		}
	};
};

exports.middleware = (store) => (next) => (action) => {
	if (!action) return;
	if (action.type == 'SESSION_PTY_DATA'){
		if (action.data.indexOf('\u001b[?1049h') !== -1) {
      store.dispatch({
        type: 'ALTERNATE_SCREEN_ON',
        uid: action.uid
      });
    } else if (action.data.indexOf('\u001b[?1049l') !== -1) {
      store.dispatch({
        type: 'ALTERNATE_SCREEN_OFF',
        uid: action.uid
      });
    }
	}
	next(action);
};
