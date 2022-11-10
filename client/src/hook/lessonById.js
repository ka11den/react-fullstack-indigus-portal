export const getStringLessonByIds = (user) => {
  if (user.details.groups?.length && 'name' in user.details.groups[0]) {
    return user.details.groups
      .map((g) => g.lessonIds.map((l) => l))
      .flat()
      .join(';')
  }
}
