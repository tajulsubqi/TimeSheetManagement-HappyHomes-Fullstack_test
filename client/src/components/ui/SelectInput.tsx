import { SelectChangeEvent } from "@mui/material"
import { useEffect, useState } from "react"
import FormControl from "@mui/material/FormControl"
import InputBase from "@mui/material/InputBase"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import { styled } from "@mui/material/styles"
import AddProjectModal from "../modal-project/AddProjectModal"
import { IoMdAdd } from "react-icons/io"
import { useQuery } from "@tanstack/react-query"
import { Api } from "@/libs/axiosInstance"

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

interface IProject {
  projectName: string
  id: string
}

interface SelectInputProps {
  onChange: (e: SelectChangeEvent) => void
  value: string
  name?: string
}

const SelectInput = ({ onChange, value, name }: SelectInputProps) => {
  const [open, setOpen] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => {
      const token = localStorage.getItem("token")
      return Api.get("/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
  })

  const projectsData = data?.data
  console.log(projectsData)

  return (
    <div>
      <label className="text-sm font-semibold text-slate-600" htmlFor="">
        Nama Project
      </label>
      <FormControl fullWidth variant="standard">
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={value}
          onChange={onChange}
          name={name}
          input={<BootstrapInput />}
        >
          <MenuItem value="">
            <button
              onClick={() => setOpen(true)}
              className="w-full text-start text-red-500 text-sm cursor-pointer"
            >
              <div className="flex items-center gap-1">
                <IoMdAdd />
                Tambah Proyek
              </div>
            </button>
          </MenuItem>
          {projectsData?.data.map((item: IProject) => (
            <MenuItem key={item.id} value={item.id} sx={{ fontSize: 14 }}>
              {item.projectName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <AddProjectModal open={open} setOpen={setOpen} />
    </div>
  )
}

export default SelectInput
