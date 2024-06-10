import React from "react"
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
import ProjectFilter from "./project-filter/ProjectFilter"
import { IoClose } from "react-icons/io5"

export interface IProject {
  id: string
  projectName: string
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  borderRadius: 2,
  bgcolor: "background.paper",
  p: 3,
}

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  onProjectFilterChange: (projects: string[]) => void
}

const FilterProjectModal = ({ open, setOpen, onProjectFilterChange }: Props) => {
  const [selectedProjects, setSelectedProjects] = React.useState<string[]>([])

  const handleProjectChange = (projects: string[]) => {
    setSelectedProjects(projects)
    onProjectFilterChange(projects)
  }

  const handleClose = () => setOpen(false)

  const handleClearFilter = () => {
    setSelectedProjects([])
    onProjectFilterChange([])
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <div className="flex justify-end">
          <IoClose
            onClick={handleClose}
            color="red"
            size={30}
            className="cursor-pointer hover:bg-red-100 duration-300 p-1 rounded-full"
          />
        </div>
        <h2 className="text-xl font-bold mb-4">Filter Proyek</h2>
        <ProjectFilter
          onProjectChange={handleProjectChange}
          selectedProjects={selectedProjects}
          onClearFilter={handleClearFilter}
        />

        <div className="flex items-center justify-end gap-x-2 border-t border-slate-300 mt-4">
          <button
            onClick={handleClearFilter}
            className="border border-slate-300  flex items-center text-Red hover:bg-red-200 duration-300 text-sm px-3 py-2 mt-7 rounded-md"
          >
            Hapus Filter
          </button>

          <button
            onClick={handleClose}
            className="bg-Red flex items-center text-white hover:bg-Red-600 hover:bg-red-600 duration-300 text-sm px-3 py-2 mt-7 rounded-md"
          >
            Terapkan
          </button>
        </div>
      </Box>
    </Modal>
  )
}

export default FilterProjectModal
