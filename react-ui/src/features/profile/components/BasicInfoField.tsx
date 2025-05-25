interface BasicInfoFieldProps {
  icon: React.ReactNode;
  text: string;
}

const BasicInfoField = ({ icon, text }: BasicInfoFieldProps) => {
  return (
    <div className="flex items-center space-x-2 text-gray-600">
      {icon}
      <span>{text}</span>
    </div>
  )
}

export default BasicInfoField