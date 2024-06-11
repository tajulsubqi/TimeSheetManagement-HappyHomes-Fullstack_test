"use client"
import useEditActivity from "@/hooks/activity/useEditActivity"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import DateInput from "../ui/DateInput"
import Input from "../ui/Input"
import SelectInput from "../ui/SelectInput"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  borderRadius: 2,
  bgcolor: "background.paper",
  p: 3,
}

interface EditActivityModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  editActivity: any
}

const EditActivityModal = ({ open, setOpen, editActivity }: EditActivityModalProps) => {
  const { formData, handleChange, handleSubmit, handleChangeProject, handleClose } =
    useEditActivity({
      setOpen,
      editActivity,
    })

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <h3 className="text-lg font-semibold border-b border-slate-300 pb-6">
              Edit Kegiatan
            </h3>
            <div className="flex gap-x-4 my-6">
              <DateInput
                type="date"
                name="startDate"
                onChange={handleChange}
                value={formData?.startDate || ""}
                label="Tanggal Mulai"
              />
              <DateInput
                type="date"
                name="endDate"
                onChange={handleChange}
                value={formData?.endDate || ""}
                label="Tanggal Berakhir"
              />
              <DateInput
                onChange={handleChange}
                value={formData?.startTime || ""}
                type="time"
                label="Jam Mulai"
                name="startTime"
              />
              <DateInput
                onChange={handleChange}
                value={formData?.endTime || ""}
                name="endTime"
                type="time"
                label="Jam Berakhir"
              />
            </div>

            <div className="flex flex-col gap-y-5 ">
              <Input
                onChange={handleChange}
                value={formData?.activityTitle || ""}
                name="activityTitle"
                label="Judul Kegiatan"
              />

              <SelectInput
                onChange={handleChangeProject}
                value={formData?.projectId || ""}
              />
            </div>

            <div className="flex items-center justify-end gap-x-2 border-t border-slate-300 mt-7">
              <button
                onClick={handleClose}
                className="border border-slate-300  flex items-center text-Red hover:bg-red-200 duration-300 text-sm px-3 py-2 mt-7 rounded-md"
              >
                Batal
              </button>{" "}
              <button
                type="submit"
                className="bg-Red flex items-center text-white hover:bg-Red-600 hover:bg-red-600 duration-300 text-sm px-3 py-2 mt-7 rounded-md"
              >
                Simpan
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default EditActivityModal
