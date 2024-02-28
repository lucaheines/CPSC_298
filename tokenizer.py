# tokenizer.py
class Tokenizer:
    def __init__(self):
        self.word_index = {}
        self.index_word = {}
        self.current_index = 1  # Start index at 1 to reserve 0 for padding
    
    def fit_on_texts(self, texts):
        for text in texts:
            for word in text.split():
                if word not in self.word_index:
                    self.word_index[word] = self.current_index
                    self.index_word[self.current_index] = word
                    self.current_index += 1
    
    def texts_to_sequences(self, texts):
        sequences = []
        for text in texts:
            seq = [self.word_index.get(word, 0) for word in text.split()]
            sequences.append(seq)
        return sequences
