export interface IEditActivity {
  id: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  activityTitle: string
  projectId?: string
  project: {
    projectName: string
  }
}

export interface PropsModalActivity {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  editActivity?: IEditActivity | null
}

export interface IAddActivity {
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  activityTitle: string
}
