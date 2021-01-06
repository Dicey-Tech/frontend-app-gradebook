import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '@edx/paragon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.initiallyOpen,
      // transitioning: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.open !== state.open) {
      return { transitioning: true, open: props.open };
    }
    return null;
  }

  close = () => { this.props.onClose(); }

  /*
  toggleOpen = () => {
    this.setState({ transitioning: true });
    // defer the transition to the next repaint so we can be sure that
    // opening drawer is visible before it transitions
    // (the start state of the opening animation doesn't work if the element starts hidden)
    this.deferToNextRepaint(() => this.setState(prevState => ({ open: this.props.makeOpen })));
  };
  */

  /*
  handleSlideDone = (e) => {
    if (e.currentTarget === e.target) {
      this.setState({ transitioning: false });
    }
  };
*/
  deferToNextRepaint(callback) {
    window.requestAnimationFrame(() => window.setTimeout(callback, 0));
  }

  render() {
    return (
      <div className="d-flex drawer-container">
        <aside
          className={classNames(
            'drawer',
            {
              open: this.state.open,
              'd-none': !this.state.open,
            },
          )}
          // onTransitionEnd={this.handleSlideDone()}
        >
          <div className="drawer-header">
            <h2>{this.props.title}</h2>
            <Button
              className="p-1"
              onClick={this.close}
              aria-label="Close Filters"
            >
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          </div>
          {this.props.children}
          <div
            className={classNames(
              'drawer-contents',
              'position-relative',
              this.state.open && 'opened',
            )}
          >
            {this.props.mainContent()}
          </div>
        </aside>
      </div>
    );
  }
}

Drawer.propTypes = {
  initiallyOpen: PropTypes.bool.isRequired,
  children: PropTypes.node,
  mainContent: PropTypes.func.isRequired,
  title: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

Drawer.defaultProps = {
  open: false,
  children: null,
};
