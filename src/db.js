import Dexie from 'dexie';

export const db = new Dexie('myDatabase');
db.version(5).stores({
  tasks: '++id, content, date', // Primary key and indexed props
});

export async function getTaskList() {

  return await db.tasks.toArray();

}

export async function addNewTask(content) {
  try {
    return await db.tasks.add({
      content,
      date: new Date(),
    });
  } catch (error) {
    console.log(`Failed to add task : ${error}`);
  }
}

export async function deleteTask(id = 2) {
  try {
    await db.tasks.delete(Number(id));
  } catch (error) {
    console.log(`Failed to delete task : ${error}`);
  }
}

export async function updateTask(id, content) {
  try {
    db.tasks.update(Number(id), { content }).then(function (updated) {
      if (updated)
        console.log(`Task number ${id} was updated`);
      else
        console.log("Nothing was updated");
    });
  } catch (error) {
    console.log(`Failed to update task : ${error}`);
  }
}

export async function getTaskContent(id) {

  return await db.tasks
    .where({ id: Number(id) })
    .toArray();

}

export function filterTasks(filterFunction) {
  return db.tasks
    .filter(filterFunction)
    .toArray();
}