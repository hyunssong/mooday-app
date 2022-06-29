import json
import torch
from transformers import DistilBertTokenizer,DistilBertForSequenceClassification
import numpy as np

with open("webapp/core/analysis/config.json") as json_file:
    config = json.load(json_file)


class Model:
    def __init__(self):
        self.device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
        self.tokenizer = DistilBertTokenizer.from_pretrained(config["BERT_MODEL"])
        classifier =DistilBertForSequenceClassification.from_pretrained(config["BERT_MODEL"],num_labels=3)
        classifier.load_state_dict(
            torch.load("webapp/assets/model.bin", map_location=self.device)
        )
        classifier = classifier.eval()
        self.classifier = classifier.to(self.device)

    def predict(self, text):
        encoded_text = self.tokenizer.encode_plus(
            text,
            max_length=config["MAX_SEQUENCE_LEN"],
            add_special_tokens=True,
            return_token_type_ids=False,
            pad_to_max_length=True,
            return_attention_mask=True,
            return_tensors="pt",
        )
        input_ids = encoded_text["input_ids"].to(self.device)
        attention_mask = encoded_text["attention_mask"].to(self.device)
        with torch.no_grad(): 
            logits = self.classifier(input_ids, attention_mask)[0]
        
        prob, predicted_class = torch.max(logits, dim=1)
        
        predicted_class = predicted_class.cpu().item()
        prob = prob.flatten().cpu().numpy().tolist()
        return (
            config["CLASS_NAMES"][predicted_class],
            dict(zip(config["CLASS_NAMES"], prob)),
        )
model = Model()
def get_model():
    return model