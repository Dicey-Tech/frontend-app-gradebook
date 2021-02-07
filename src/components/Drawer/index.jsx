import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '@edx/paragon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default class Drawer extends React.Component {
  constructor(props) {
    super(props);
    /* this.state = {
      open: props.initiallyOpen,
      transitioning: false,
    }; */
    this.handleToggle = this.toggleOpen.bind(this);
  }

  close = () => {
    if (this.state.open) {
      this.toggleOpen();
    }
  };

  toggleOpen = () => {
    this.props.toggleOpen();
    // this.setState({ transitioning: true });
    // defer the transition to the next repaint so we can be sure that
    // opening drawer is visible before it transitions
    // (the start state of the opening animation doesn't work if the element starts hidden)
    // this.deferToNextRepaint(() => this.setState(prevState => ({ open: !prevState.open })));
  };

  // handleSlideDone = (e) => {
  //  if (e.currentTarget === e.target) {
  //    this.setState({ transitioning: false });
  //  }
  // };

  deferToNextRepaint(callback) {
    window.requestAnimationFrame(() => window.setTimeout(callback, 0));
  }

  render() {
    return (
      <div className="drawer-container">
        <div
          className={classNames(
            'drawer',
            {
              open: this.props.open,
              // 'd-none': !this.props.open,

            },
            'bg-white',
            'border',
            'border-light',
            'rounded-right',
          )}
        >
          <div className="drawer-header">
            <h2>{this.props.title}</h2>
            <Button
              className="p-1"
              onClick={this.handleToggle}
              aria-label="Close Filters"
            >
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Drawer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
