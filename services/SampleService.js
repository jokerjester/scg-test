const SampleRepository =  require('../repositories/SampleRepository')

this.findAnswer = function(question) {
    return SampleRepository.findByKeyword(question).then(result => result).catch(error => error)
}

this.saveSample = function(sample) {
    return SampleRepository.saveSample(sample).then(result => result).catch(error => error)
}