import Table from "@/components/table/Table"
import SearchInput from "@/components/ui/SearchInput"
import { formatToRupiah } from "@/utils/currencyFormatter"
import { IoIosAddCircleOutline } from "react-icons/io"
import { IoFilter } from "react-icons/io5"
import ModalActivity from "./modal-activity/AddActivityModal"
import FilterProjectModal from "./modal-filter/FilterProjectModal"
import useUser from "@/hooks/useUser"
import useMain from "@/hooks/useMain"
import { useState } from "react"

const Main = () => {
  const handleOpen = () => setOpen(true)
  const [open, setOpen] = useState(false)

  const { user } = useUser()
  const {
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
  } = useMain()

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
            <SearchInput onSearch={setSearchQuery} />

            <button
              onClick={() => setOpenFilter(true)}
              className="border border-slate-300 p-2 rounded-md hover:bg-slate-100 duration-300"
            >
              <IoFilter color="red" size={20} />
            </button>
          </div>
        </div>

        <div className="mt-8">
          <Table
            data={filteredActivities}
            handleDelete={handleDeleteActivity}
            handleEdit={handleEditActivity}
            totalIncome={totalIncome}
            totalDuration={totalDuration}
            deleteId={deleteId}
            editActivity={editActivity}
            openDelete={openDelete}
            openEdit={openEdit}
            setOpenDelete={setOpenDelete}
            setOpenEdit={setOpenEdit}
          />
        </div>
      </div>

      <ModalActivity open={open} setOpen={setOpen} />

      <FilterProjectModal
        open={openFilter}
        setOpen={setOpenFilter}
        onProjectFilterChange={handleProjectFilterChange}
      />
    </section>
  )
}

export default Main
