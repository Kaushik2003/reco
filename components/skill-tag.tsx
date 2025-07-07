interface SkillTagProps {
  skill: string
}

const skillColors = [
  "bg-blue-100 text-blue-800",
  "bg-green-100 text-green-800",
  "bg-purple-100 text-purple-800",
  "bg-pink-100 text-pink-800",
  "bg-yellow-100 text-yellow-800",
  "bg-indigo-100 text-indigo-800",
]

export function SkillTag({ skill }: SkillTagProps) {
  const colorIndex = skill.length % skillColors.length
  const colorClass = skillColors[colorIndex]

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${colorClass} transition-all hover:scale-105`}
    >
      {skill}
    </span>
  )
}
