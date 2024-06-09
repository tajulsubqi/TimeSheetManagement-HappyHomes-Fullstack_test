import { IActivity } from "@/interface/IActivity"
import { Api } from "@/libs/axiosInstance"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

const useMain = () => {
  const [openFilter, setOpenFilter] = useState(false)
  const [selectedProjects, setSelectedProjects] = useState<string[]>([])

  const [openDelete, setOpenDelete] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editActivity, setEditActivity] = useState<IActivity | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const { data } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const response = await Api.get("/activities")
      return response.data
    },
  })

  // Menghitung total pendapatan keseluruhan
  const activities = data?.data
  const totalIncome = activities?.reduce(
    (total: number, item: IActivity) => total + item.totalIncome,
    0,
  )

  // Menghitung total durasi keseluruhan
  const totalDuration = activities?.reduce(
    (total: number, item: IActivity) => total + item.duration,
    0,
  )

  const handleDeleteActivity = (id: string) => {
    setDeleteId(id)
    setOpenDelete(true)
  }

  const handleEditActivity = (activity: IActivity) => {
    setEditActivity(activity)
    setOpenEdit(true)
  }

  const handleProjectFilterChange = (projects: string[]) => {
    setSelectedProjects(projects)
  }

  // Filter activities berdasarkan search query dan selected projects
  const filteredActivities = activities?.filter((activity: IActivity) => {
    const matchesSearchQuery =
      activity.activityTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.project?.projectName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesProjectFilter =
      selectedProjects.length === 0 ||
      selectedProjects.includes(activity.project?.projectName || "")
    return matchesSearchQuery && matchesProjectFilter
  })

  return {
    open,
    openFilter,
    setOpenFilter,
    handleProjectFilterChange,
    filteredActivities,
    totalIncome,
    totalDuration,
    openDelete,
    setOpenDelete,
    deleteId,
    openEdit,
    setOpenEdit,
    editActivity,
    setSearchQuery,
    handleDeleteActivity,
    handleEditActivity,
  }
}

export default useMain
