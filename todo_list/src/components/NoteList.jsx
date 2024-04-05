import { GrUpdate } from "react-icons/gr";
import Button from "./Button";
import { AiOutlineClose } from "react-icons/ai";

function Note({ id, content, onDelete, onUpdate }) {
  const handleUpdate = () => {
    onUpdate(id);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="flex justify-between">
      <li>{content}</li>
      <div
        className="flex gap-2
      "
      >
        <Button children={<GrUpdate />} onClick={handleUpdate} />
        <Button children={<AiOutlineClose />} onClick={handleDelete} />
      </div>
    </div>
  );
}

export default function NotesList({ notes, onDelete, onUpdate }) {
  return (
    <ul
      className="flex flex-col gap-2
    "
    >
      {Object.entries(notes).map(([key, value]) => (
        <Note
          key={key}
          id={key}
          content={value}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}
