import torch
import torch.nn as nn

DYNAMIC_CLASSES = [
    "hello", "bye", "again", "you", "deaf", "hearing", "teacher",
    "thank_you", "welcome", "sorry", "correct", "wrong", "good",
    "morning", "understand", "yes", "no", "exam", "home", "work",
    "can", "will", "do", "your", "write", "this", "it", "difficult",
    "read", "yesterday", "my", "name", "who", "what", "class",
    "leader", "i_or_me", "i_dont_understand", "tomorrow", "how",
    "sit_down", "stand_up", "come", "study", "look", "here",
    "now", "help", "quiet"
]

class SignLanguageLSTM(nn.Module):
    def __init__(self, input_size: int = 258, hidden_size: int = 128, num_layers: int = 2, num_classes: int = 49, dropout: float = 0.5):
        super(SignLanguageLSTM, self).__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True, dropout=dropout if num_layers > 1 else 0)
        self.dropout = nn.Dropout(dropout)
        self.fc = nn.Linear(hidden_size, num_classes)

    def forward(self, x):
        out, _ = self.lstm(x)
        final_out = self.dropout(out[:, -1, :])
        return self.fc(final_out)
