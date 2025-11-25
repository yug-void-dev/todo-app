const EditButtons = ({
  setTodos,
  setFlag,
  updatedTask,
  editingIndex,
  setEditingIndex,
}) => {
  function handleOk() {
    setTodos((prev) =>
      prev.map((item, index) => (index === editingIndex ? updatedTask : item))
    );

    setEditingIndex(null);
    setFlag(true);
  }

  function handleCancel() {
    setEditingIndex(null);
    setFlag(true);
  }

  return (
    <div className="edits-btn">
      <button onClick={handleOk}>Ok</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default EditButtons;
