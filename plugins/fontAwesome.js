import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

// add any icon you use manually
library.add(faTimesCircle, faCheckCircle)

// this one is the key to render the icon in the toast
dom.watch()
