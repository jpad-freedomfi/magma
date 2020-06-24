/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import * as React from 'react';
import Portal from '../Core/Portal';
import classNames from 'classnames';
import symphony from '../../../theme/symphony';
import {makeStyles} from '@material-ui/styles';

const SIDE_PANEL_WIDTH = '474px';

const useStyles = makeStyles(() => ({
  root: {
    alignItems: 'stretch',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '100vh',
    zIndex: 1,
    position: 'fixed',
    left: `calc(100% - ${SIDE_PANEL_WIDTH})`,
    right: 0,
    top: 0,
    bottom: 0,
    overflow: 'hidden',
    '&:not($hidden) > $anchor$right $dialog > *': {
      transition: 'opacity 100ms 300ms',
    },
    '&$hidden > $anchor$right $dialog > *': {
      transition: 'opacity 100ms',
    },
  },
  withTransition: {
    transition: 'left ease-out 400ms',
  },
  withMask: {
    left: 0,
    '&:not($hidden) > $anchor$right > $dialog': {
      width: SIDE_PANEL_WIDTH,
    },
  },
  anchor: {
    alignItems: 'flex-start',
    display: 'flex',
    pointerEvents: 'none',
    maxHeight: '100%',
  },
  center: {
    justifyContent: 'center',
    '& > $dialog': {
      borderRadius: '4px',
    },
  },
  right: {
    justifyContent: 'flex-end',
    flexGrow: 1,
    '& > $dialog': {
      height: '100%',
      width: '100%',
    },
  },
  dialog: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    pointerEvents: 'all',
    position: 'relative',
    zIndex: 0,
    backgroundColor: symphony.palette.white,
    boxShadow: symphony.shadows.DP3,
    marginLeft: '22px',
    transition: 'width ease-out 400ms',
  },
  hidden: {
    '& $mask': {
      display: 'none',
    },
    left: '100%',
    // visibility: 'hidden',
    '& $dialog': {
      width: 0,
      '& > *': {
        opacity: 0,
      },
    },
  },
  mask: {
    backgroundColor: symphony.palette.overlay,
    position: 'fixed',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
}));

export const POSITION = {
  center: 'center',
  right: 'right',
};
export type DialogPosition = $Keys<typeof POSITION>;

type Props = $ReadOnly<{|
  children: React.Node,
  position?: ?DialogPosition,
  isModal?: ?boolean,
  hidden?: boolean,
  onClose?: () => void,
  className?: string,
|}>;

function DialogFrame(props: Props) {
  const {
    children,
    className,
    hidden = false,
    position: positionProp,
    isModal: isModalProp,
    onClose,
  } = props;
  const classes = useStyles();

  const position = positionProp ?? POSITION.center;
  const isModal = isModalProp !== false;

  return (
    <Portal target={document.body}>
      <div
        className={classNames(classes.root, {
          [classes.hidden]: hidden,
          [classes.withMask]: isModal,
          [classes.withTransition]: position === POSITION.right,
        })}>
        {isModal && <div className={classes.mask} onClick={onClose} />}
        <div className={classNames(classes.anchor, classes[position])}>
          <div className={classNames(classes.dialog, className)}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
}

export default DialogFrame;