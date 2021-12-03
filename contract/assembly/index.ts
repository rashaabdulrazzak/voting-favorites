import { Context, logging, PersistentMap } from 'near-sdk-as'

const CandidateUrl = new PersistentMap<string, string>('Candidate Url')
const CandidatePair = new PersistentMap<string, string[]>('Candidate Pair')
const PromptArray = new PersistentMap<string, string[]>('Array of Prompt')
const VotesArray = new PersistentMap<string, i32[]>('Store Vote')
const userParticipation = new PersistentMap<string, string[]>('User Particpation Record')

// View Methods

export function getUrl(name: string): string {
  if (CandidateUrl.contains(name)) {
    return CandidateUrl.getSome(name)
  } else {
    logging.log('can not find that user')
    return ''
  }
}

export function didParticipte(prompt: string, user: string): bool {
  if (userParticipation.contains(prompt)) {
    let tempArray = userParticipation.getSome(prompt)
    return tempArray.includes(user)
  } else {
    logging.log('prompt not found')
    return false
  }
}

export function getAllPrompt(): string[] {
  if (PromptArray.contains('AllArrays')) {
    return PromptArray.getSome('AllArrays')
  }
  else {
    logging.log('no prompt found')
    return []
  }
}

export function getVotes(prompt: string): i32[] {
  if (VotesArray.contains(prompt)) {
    return VotesArray.getSome(prompt)
  } else {
    logging.log('prompt not found for this vote')
    return [0, 0]
  }
}

export function getCandidatePair(prompt: string): string[] {
  if (CandidatePair.contains(prompt)) {
    return CandidatePair.getSome(prompt)
  }
  else {
    logging.log('prompt not found')
    return []
  }
}

// Change Methods
export function addUrl(name: string, url: string): void {
  CandidateUrl.set(name, url)
  logging.log('added url for' + name)
}
export function addCandidatePair(prompt: string, name1: string, name2: string): void {
  CandidatePair.set(prompt, [name1, name2])
}
export function addVote(prompt: string, index: i32): void {
  if (VotesArray.contains(prompt)) {
    let tempArray = VotesArray.getSome(prompt)
    let tempVal = tempArray[index];
    let newVal = tempVal + 1;
    tempArray[index] = newVal;
    VotesArray.set(prompt, tempArray)

  } else {
    let newArray = [0, 0];
    newArray[index] = 1;
    VotesArray.set(prompt, newArray)
  }
}

export function recordUser(prompt: string, user: string): void {
  if (userParticipation.contains(prompt)) {
    let tempArray = userParticipation.getSome(prompt)
    tempArray.push(user);
    userParticipation.set(prompt, tempArray)
  }
  else {
    userParticipation.set(prompt, [user])
  }
}
export function addToPromptArray(prompt: string): void {
  logging.log('added to promptArray')
  if (PromptArray.contains('AllArrays')) {
    let tempArray = PromptArray.getSome('AllArrays')
    tempArray.push(prompt)
    PromptArray.set('AllArrays', tempArray)
  } else {
    PromptArray.set('AllArrays', [prompt])
  }
}
export function deleteFromPromptArray(prompt: string): void {
  logging.log('delet from promptArray')
  logging.log(prompt)
  if (PromptArray.contains('AllArrays')) {
    let tempArray = PromptArray.getSome('AllArrays')

    let i: i32 = 1;



    let uniqueChars = [tempArray[0]];

    while (i < tempArray.length) {
      logging.log(tempArray[i])
      if (!uniqueChars.includes(tempArray[i])) {
        logging.log('1')
        uniqueChars.push(tempArray[i])
      }
      i++
    }
    let j: i32 = 0
    while (j < uniqueChars.length) {
      logging.log(uniqueChars[j])
      j++
    }
    const index = uniqueChars.indexOf(prompt);
    logging.log(index)

    if (index > -1) {
      tempArray.splice(index, 1);
    }
    PromptArray.set('AllArrays', uniqueChars)
  }

}