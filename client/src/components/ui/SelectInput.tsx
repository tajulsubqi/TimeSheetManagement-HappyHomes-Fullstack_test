import FormControl from "@mui/material/FormControl"
import InputBase from "@mui/material/InputBase"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import { styled } from "@mui/material/styles"
import * as React from "react"
import AddProjectModal from "../modal-project/AddProjectModal"
import { IoMdAdd } from "react-icons/io"

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 14,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))

const dummyProjects = [
  { id: 1, name: "Project Alpha" },
  { id: 2, name: "Project Beta" },
  { id: 3, name: "Project Gamma" },
]

const SelectInput = () => {
  const [project, setProject] = React.useState("")
  const [open, setOpen] = React.useState(false)

  const handleChange = (event: { target: { value: string } }) => {
    setProject(event.target.value)
  }

  return (
    <div>
      <label className="text-sm font-semibold text-slate-600" htmlFor="">
        Nama Project
      </label>
      <FormControl fullWidth variant="standard">
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={project}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <MenuItem value="">
            <button
              onClick={() => setOpen(true)}
              className="w-full text-start text-red-500 text-sm"
            >
              <div className="flex items-center gap-1">
                <IoMdAdd />
                Tambah Proyek
              </div>
            </button>
          </MenuItem>
          {dummyProjects.map((proj) => (
            <MenuItem key={proj.id} value={proj.id} sx={{ fontSize: 14 }}>
              {proj.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <AddProjectModal open={open} setOpen={setOpen} />
    </div>
  )
}

export default SelectInput
