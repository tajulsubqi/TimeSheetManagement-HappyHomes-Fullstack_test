"use client"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Typography from "@mui/material/Typography"
import DateInput from "./ui/DateInput"
import Input from "./ui/Input"

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

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

export default function ModalActivity({ open, setOpen }: Props) {
  const handleClose = () => setOpen(false)

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h3 className="text-lg font-semibold border-b border-slate-300 pb-6">
              Tambah Kegiatan Baru
            </h3>
            <div className="flex gap-x-4 my-6">
              <DateInput label="Tanggal Mulai" />
              <DateInput label="Tanggal Berakhir" />
              <DateInput type="time" label="Jam Mulai" />
              <DateInput type="time" label="Jam Berakhir" />
            </div>

            <div className="flex flex-col gap-y-5 border-b border-slate-300 ">
              <Input label="Judul Kegiatan" />
              <Input label="Deskripsi Kegiatan" />
            </div>

            <div className="flex items-center justify-end gap-x-2 border-t border-slate-300 mt-7">
              <button
                onClick={handleClose}
                className="border border-slate-300  flex items-center text-Red hover:bg-red-200 duration-300 text-sm px-3 py-2 mt-7 rounded-md"
              >
                cancel
              </button>{" "}
              <button className="bg-Red flex items-center text-white hover:bg-Red-600 hover:bg-red-600 duration-300 text-sm px-3 py-2 mt-7 rounded-md">
                Simpan
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
