import styles from '../SCSS/Point.module.scss';

const Point = ({ name, description }) => {
  return (
    <>
      <span className={styles.marker}>
        <span className={styles.center}>
          <div className={styles.detail}>
            <h4 className={styles.name}>{name}</h4>
            <p>{description}</p>
          </div>
        </span>
      </span>
    </>
  );
};

export default Point;
