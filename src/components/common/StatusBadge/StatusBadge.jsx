import styles from "./StatusBadge.module.css";

function StatusBadge({ status, children, className = "" }) {
  const classes = [styles.badge, styles[status], className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes}>
      <span className={styles.dot}></span>
      {children || status}
    </span>
  );
}

export default StatusBadge;