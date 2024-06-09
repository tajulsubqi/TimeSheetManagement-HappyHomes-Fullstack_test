"use client"
import { IPropsTable } from "@/interface/ITable"
import DeleteActivityModal from "../modal-activity/DeleteActivityModal"
import EditActivityModal from "../modal-activity/EditActivityModal"
import TableFooter from "./TableFooter"
import TableHeader from "./TableHeader"
import TableLists from "./TableLists"

const Table = (Props: IPropsTable) => {
  const {
    data,
    handleDelete,
    handleEdit,
    openDelete,
    openEdit,
    totalIncome,
    totalDuration,
    deleteId,
    editActivity,
    setOpenDelete,
    setOpenEdit,
  } = Props

  return (
    <div className="overflow-x-auto bg-white rounded-xl">
      <table className="w-full border">
        <TableHeader />

        <TableLists data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
      </table>

      <TableFooter totalDuration={totalDuration} totalIncome={totalIncome} />

      <EditActivityModal
        open={openEdit}
        setOpen={setOpenEdit}
        editActivity={editActivity}
      />

      <DeleteActivityModal
        open={openDelete}
        setOpen={setOpenDelete}
        deleteId={deleteId}
      />
    </div>
  )
}

export default Table
