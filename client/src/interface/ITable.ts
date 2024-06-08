import { IActivity } from "./IActivity"

export interface IPropsTable {
  data: IActivity[]
  handleDelete: (id: string) => void
  handleEdit: (activity: IActivity) => void
  openDelete: boolean
  openEdit: boolean
  totalIncome: number
  totalDuration: number
  deleteId: string | null
  editActivity: IActivity | null
  setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>
}
