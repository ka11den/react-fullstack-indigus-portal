export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "Пользователь",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Почта",
    width: 230,
  },
  {
    field: 'groups',
    headerName: 'Группы',
    width: 200,
    renderCell: (params) => {
      const groups = params.row.groups;
      return (
        <div className="cellWithImg">
          {groups?.length ? (
            groups.map((group, idx) => (
              <p key={group._id}>
                {group.name}
                {idx + 1 !== groups?.length && ', '}
              </p>
            ))
          ) : (
            <p>без групп :(</p>
          )}
        </div>
      );
    },
  },
  {
    field: "fio",
    headerName: "Ф.И.О",
    width: 200,
  },
];

export const workColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "title",
    headerName: "Тема",
    width: 150,
  },
  {
    field: "desc",
    headerName: "Описание",
    width: 230,
  },
];

export const lessonColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Тема",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Описание",
    width: 200,
  },
  {
    field: "works",
    headerName: "Дз",
    width: 100,
  },
];

export const testColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Тема",
    width: 230,
  },
  {
    field: "tests",
    headerName: "Тест",
    width: 200,
  },
];

export const scheduleColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "День Недели",
    width: 230,
  },
  {
    field: "tests",
    headerName: "Группа",
    width: 200,
  },
];

export const newColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Заголовок",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Описание",
    width: 200,
  },
];

export const groupColumns = [
  { field: '_id', headerName: 'ID', width: 70 },
  {
    field: 'name',
    headerName: 'Имя',
    width: 230,
  },
  {
    field: 'lessonIds',
    headerName: 'Предметы',
    width: 200,
    renderCell: (params) => {
      const lessons = params.row.lessonIds;
      return (
        <div className="cellWithImg">
          {lessons?.length ? (
            lessons.map((lesson, idx) => (
              <p key={lesson._id}>
                {lesson.title}
                {idx + 1 !== lessons?.length && ', '}
              </p>
            ))
          ) : (
            <p>noop</p>
          )}
        </div>
      );
    },
  },
];

export const materialColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Заголовок",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Описание",
    width: 200,
  },
];

export const gradesTestColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Тема",
    width: 230,
  },
  {
    field: "completedTests",
    headerName: "Выполнили",
    width: 1050,
  },
];

export const gradesWorkColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Тема",
    width: 230,
  },
  {
    field: "completedWorkers",
    headerName: "Выполнили",
    width: 1050,
  },
];