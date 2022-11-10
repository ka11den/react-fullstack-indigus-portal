import Group from '../models/Group.js'
import Schedule from '../models/Schedule.js'

export const createSchedules = async (req, res, next) => {
  try {
    const schedule = await Schedule.findOneAndUpdate(
      { title: req.body.title },
      req.body,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    res.status(200).json(schedule)
  } catch (err) {
    next(err)
  }
}

export const clearSchedules = async (req, res) => {
  await Schedule.deleteMany()
  res.json('COLLECTION HAS BEEN DESTROYED')
}

export const updateSchedules = async (req, res, next) => {
  try {
    const updatedSchedules = await Schedule.findByIdAndUpdate(req.params.id, {
      $set: req.body,
      new: true,
    })
    res.send(updatedSchedules)
  } catch (err) {
    next(err)
  }
}

export const deleteSchedules = async (req, res, next) => {
  const groupId = req.params.groupid
  try {
    await Schedule.findByIdAndDelete(req.params.id)
    try {
      await Group.findByIdAndUpdate(groupId, {
        $pull: { schedules: req.params.id },
      })
    } catch (err) {
      next(err)
    }
    res.send('Расписание было удалено')
  } catch (err) {
    next(err)
  }
}

export const getSchedule = async (req, res, next) => {
  try {
    let title
    switch (req.params.title) {
      case 'monday':
        title = 'Понедельник'
        break
      case 'tuesday':
        title = 'Вторник'
        break
      case 'wednesday':
        title = 'Среда'
        break
      case 'thursday':
        title = 'Четверг'
        break
      case 'friday':
        title = 'Пятница'
        break
      case 'saturday':
        title = 'Суббота'
        break
    }
    console.log(title, req.query.group)
    const schedule = await Schedule.find({
      title,
      group: req.query.group,
    }).populate('lessons')
    res.send(schedule)
  } catch (err) {
    next(err)
  }
}

export const getSchedules = async (req, res, next) => {
  try {
    const schedules = await Schedule.find({
      validUntil: { $lt: Date.now(req.body.date) },
    })
    res.send(schedules)
  } catch (err) {
    next(err)
  }
}
