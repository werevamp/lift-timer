import { library, config } from '@fortawesome/fontawesome-svg-core'

// Prevent Font Awesome from adding its CSS automatically
config.autoAddCss = false

// Example icons - import what you need
import {
  faPlay,
  faPause,
  faStop,
  faRedo,
  faCog,
  faHome,
  faDumbbell,
  faClock,
  faCheck,
  faTimes,
  faPlus,
  faMinus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'

// Add icons to the library
library.add(
  faPlay,
  faPause,
  faStop,
  faRedo,
  faCog,
  faHome,
  faDumbbell,
  faClock,
  faCheck,
  faTimes,
  faPlus,
  faMinus,
  faXmark
)

// Export for convenience
export { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
