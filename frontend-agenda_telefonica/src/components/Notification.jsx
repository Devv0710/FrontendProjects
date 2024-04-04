const Notification = ({ info }) => {
  if (!info.message) {
    return;
  }
  return (
    <div className={info.type}>
      <p>{info.message}</p>
    </div>
  );
};
export default Notification;
