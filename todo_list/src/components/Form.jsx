import Button from "./Button";

export default function Form({ onSubmit, value, onChange }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mb-5
    "
    >
      <label id="todo">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Create a new Todo"
          id="todo"
          className="text-black py-2 px-1 w-full rounded outline hover:outline-slate-700"
          required
        />
      </label>
      <Button
        type="submit"
        className="w-full bg-slate-500 rounded  py-1.5 hover:bg-slate-400"
      >
        Save
      </Button>
    </form>
  );
}
