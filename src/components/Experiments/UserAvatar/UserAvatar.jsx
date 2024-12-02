import React from 'react';
import styles from './UserAvatar.module.scss';

const UserAvatar = ({ user }) => {
  return (
    <div className={styles.avatar} style={{ backgroundColor: user.color }}>
      {user.initials}
    </div>
  );
};

export default UserAvatar;
