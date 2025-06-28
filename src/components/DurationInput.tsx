interface DurationInputProps {
  label: string
  value: number
  onChange: (value: number) => void
  disabled: boolean
}

export const DurationInput = ({ 
  label, 
  value, 
  onChange, 
  disabled 
}: DurationInputProps) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} (seconds)
    </label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Math.max(1, parseInt(e.target.value) || 1))}
      disabled={disabled}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
      min="1"
    />
  </div>
)