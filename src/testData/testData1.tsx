import { History, Presentation } from '../types/types'

const history: History = {
    events: [],
}

const presentation: Presentation = {
    id: 'presentation1',
    name: 'Моя презентация',
    history: history,
    slides: [],
}

console.log('Presentation: ', presentation)
