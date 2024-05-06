import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export default function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();
  const inputClass =
    "w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 text-xl";

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", dayjs(task.date).utc().format('YYYY-MM-DD'))
      }
    }
    loadTask();
  }, []);

  const onSubmit = handleSubmit((data) => {

    const dataValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    };
    
    if (params.id) {
      updateTask(params.id, dataValid)
    } else {
      createTask(dataValid);
    }
    navigate("/tasks");
  });

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Título</label>
        <input
          type="text"
          placeholder="Título"
          {...register("title")}
          autoFocus
          className={inputClass}
        />
        <label htmlFor="description">Descripción</label>
        <textarea
          rows="4"
          placeholder="Descripción"
          {...register("description")}
          className={inputClass}
        ></textarea>

        <label htmlFor="date">Fecha</label>
        <input type="date" {...register("date")} className={inputClass} />

        <button className="my-2 py-2 px-4 bg-sky-700 text-lg rounded-md">
          Guardar
        </button>
      </form>
    </div>
  );
}
