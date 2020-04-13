import { eventListeners } from './js/initializeAndHandleListeners'
import { destinationValidator } from './js/destinationValidator'
import { dateValidator } from './js/dateValidator'
import { contentAppend } from './js/updateContentInfo'

import './styles/styles.scss'
import './styles/header_footer.scss'
import './styles/content.scss'

window.addEventListener('DOMContentLoaded', eventListeners)

export {
    destinationValidator,
    dateValidator,
    contentAppend
}

