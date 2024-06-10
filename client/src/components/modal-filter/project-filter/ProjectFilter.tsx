import { Api } from "@/libs/axiosInstance"
import FormControl from "@mui/material/FormControl"
import MenuItem from "@mui/material/MenuItem"
import OutlinedInput from "@mui/material/OutlinedInput"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { useTheme } from "@mui/material/styles"
import { useQuery } from "@tanstack/react-query"
import SelectedChips from "./SelectChip"
import { MenuProps } from "./menuProps"
import { getStyles } from "./styles"
import { IProject, PropsProjectFilter } from "@/interface/IProjectFilter"

export default function ProjectFilter(Props: PropsProjectFilter) {
  const theme = useTheme()

  const { onProjectChange, selectedProjects } = Props
  const { data } = useQuery({
    queryKey: ["projects"],
    queryFn: () => Api.get("/projects"),
  })

  const handleChange = (event: SelectChangeEvent<typeof selectedProjects>) => {
    const {
      target: { value },
    } = event
    onProjectChange(typeof value === "string" ? value.split(",") : value)
  }

  const projectsData: { data: IProject[] } = data?.data

  return (
    <div>
      <label className="text-sm font-semibold text-slate-600">Proyek</label>
      <FormControl fullWidth sx={{ width: 650 }}>
        <Select
          sx={{ borderRadius: 2 }}
          multiple
          value={selectedProjects}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => <SelectedChips selected={selected} />}
          MenuProps={MenuProps}
        >
          {projectsData?.data.map((item) => (
            <MenuItem
              key={item.id}
              value={item.projectName}
              style={getStyles(item.projectName, selectedProjects, theme)}
            >
              {item.projectName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
