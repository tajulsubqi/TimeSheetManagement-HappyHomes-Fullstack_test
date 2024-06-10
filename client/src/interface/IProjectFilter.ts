export interface PropsProjectFilter {
  onProjectChange: (projects: string[]) => void
  selectedProjects: string[]
  onClearFilter: () => void
}

export interface IProject {
  id: string
  projectName: string
}
