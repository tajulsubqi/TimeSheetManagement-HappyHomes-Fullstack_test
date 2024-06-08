"use client"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import ProjectFilter from "../ui/ProjectFilter"

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
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

const FilterProjectModal = ({ open, setOpen }: Props) => {
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h3 className="text-lg font-bold border-b border-slate-300 pb-6">Filter</h3>

            <div className="flex gap-x-4 my-6">
              <ProjectFilter />
            </div>

            <div className="flex items-center justify-end gap-x-2 border-t border-slate-300 mt-4">
              <button
                onClick={handleClose}
                className="border border-slate-300  flex items-center text-Red hover:bg-red-200 duration-300 text-sm px-3 py-2 mt-7 rounded-md"
              >
                Hapus Filter
              </button>{" "}
              <button
                // onClick={handleDeleteActivity}
                className="bg-Red flex items-center text-white hover:bg-Red-600 hover:bg-red-600 duration-300 text-sm px-3 py-2 mt-7 rounded-md"
              >
                Terapkan
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default FilterProjectModal
