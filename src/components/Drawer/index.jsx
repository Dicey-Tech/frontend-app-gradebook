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
      transitioning: false,
    };
  }

  close = () => {
    if (this.state.open) {
      this.toggleOpen();
    }
  };

  toggleOpen = () => {
    this.setState({ transitioning: true });
    // defer the transition to the next repaint so we can be sure that
    // opening drawer is visible before it transitions
    // (the start state of the opening animation doesn't work if the element starts hidden)
    this.deferToNextRepaint(() => this.setState(prevState => ({ open: !prevState.open })));
  };

  handleSlideDone = (e) => {
    if (e.currentTarget === e.target) {
      this.setState({ transitioning: false });
    }
  };

  deferToNextRepaint(callback) {
    window.requestAnimationFrame(() => window.setTimeout(callback, 0));
  }

  render() {
    return (
      <div className="d-flex flex-row justify-content-between bg-white">
        <div className="drawer-container">
          <div
            className={classNames(
              'drawer',
              {
                open: this.state.open,
                'd-none': !this.state.transitioning && !this.state.open,

              },
              'bg-white',
              'border',
              'border-light',
              'rounded-right',
            )}
            onTransitionEnd={this.handleSlideDone}
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
          </div>
        </div>
        <div
          className={classNames(
            'container-fluid',
            !this.state.drawerTransitioning && this.state.drawerOpen && 'opened',
          )}
        >
          {this.props.mainContent(this.toggleOpen)}
        </div>
      </div>
    );
  }
}

Drawer.propTypes = {
  initiallyOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  mainContent: PropTypes.func.isRequired,
  title: PropTypes.node.isRequired,
};
