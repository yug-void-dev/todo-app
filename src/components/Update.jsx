const Update = ({ setUpdatedTask, updatedTask }) => {
  return (
    <div className="update-todo">
      <input
        onChange={(e) => setUpdatedTask(e.target.value)}
        value={updatedTask}
        type="text"
        placeholder="Update Todo"
      />
    </div>
  );
};

export default Update;
