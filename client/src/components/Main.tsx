import Table from "@/components/Table"
import SearchInput from "@/components/ui/SearchInput"
import { useEffect, useState } from "react"
import { IoIosAddCircleOutline } from "react-icons/io"
import { IoFilter } from "react-icons/io5"
import ModalActivity from "./modal-activity/AddActivityModal"
import { jwtDecode } from "jwt-decode"
import { formatToRupiah } from "@/utils/currencyFormatter"

interface IUser {
  name: string
  hourlyRate: number
  id: string
}

const Main = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)

  const [user, setUser] = useState<IUser | null>(null)
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      const decodedToken = jwtDecode<IUser>(token)
      setUser(decodedToken)
    }
  }, [])

  return (
    <section className="bg-white px-6 rounded-xl shadow h-full pb-20">
      <div className="flex gap-x-16 border-b py-6">
        <div>
          <p className="text-xs">Nama Karyawan</p>
          <p>{user?.name}</p>
        </div>

        <div>
          <p className="text-xs">Rate</p>
          <p>{user ? formatToRupiah(user.hourlyRate) : formatToRupiah(0)}/jam</p>
        </div>
      </div>

      <div className="py-7 font-semibold">
        <div className="flex justify-between items-center gap-x-5">
          <div className="flex gap-x-5 items-center">
            <h3>Daftar Kegiatan</h3>

            <button
              onClick={handleOpen}
              className="bg-sky-100 flex items-center text-blue-600 hover:bg-sky-200 duration-300 text-sm px-3 py-2 rounded-md"
            >
              <IoIosAddCircleOutline className="mr-1" size={20} />
              <p>Tambah Kegiatan</p>
            </button>
          </div>

          <div className="flex gap-x-3 items-center">
            <SearchInput />
            <div className="border border-slate-300 p-2 rounded-md">
              <IoFilter color="red" size={20} />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Table />
        </div>
      </div>
      <ModalActivity open={open} setOpen={setOpen} />
    </section>
  )
}

export default Main
