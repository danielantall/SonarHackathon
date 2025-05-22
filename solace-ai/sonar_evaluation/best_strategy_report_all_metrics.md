
# Best Strategy Evaluation Report: Base Prompt

## Overall Metrics

- **Length Ratio**: 0.7540
- **BLEU Scores**:
  - BLEU-1: 0.3683
  - BLEU-2: 0.1884
  - BLEU-3: 0.1060
  - BLEU-4: 0.0612
  - BLEU-Avg: 0.1810
- **ROUGE Scores**:
  - ROUGE-1 F1: 0.3102
  - ROUGE-2 F1: 0.0805
  - ROUGE-L F1: 0.2824
- **BERTScore**:
  - Precision: 0.0506
  - Recall: 0.2023
  - F1: 0.1263
- **Combined Weighted Score**: 0.3096

## Performance by Emotion

| Emotion | Count | Length Ratio | BLEU-Avg | ROUGE-L F1 | BERTScore F1 |
|---------|-------|-------------|----------|------------|--------------|
| anxiety | 20 | 0.8271 | 0.1959 | 0.2857 | 0.1201 |
| sadness | 3 | 0.7519 | 0.2138 | 0.3121 | 0.1541 |
| frustration | 3 | 0.8571 | 0.1995 | 0.3120 | 0.1813 |
| hope | 6 | 0.7449 | 0.1558 | 0.2483 | 0.1155 |
| neutral | 6 | 0.4557 | 0.1116 | 0.2472 | 0.0944 |
| fear | 2 | 0.7924 | 0.2381 | 0.3678 | 0.1923 |

## Performance by Severity

| Severity | Count | Length Ratio | BLEU-Avg | ROUGE-L F1 | BERTScore F1 |
|----------|-------|-------------|----------|------------|--------------|
| low | 12 | 0.6695 | 0.1658 | 0.2802 | 0.1257 |
| medium | 5 | 0.7111 | 0.1749 | 0.2887 | 0.1036 |
| high | 23 | 0.8073 | 0.1902 | 0.2821 | 0.1316 |

## Interpretation

The BLEU scores measure the precision of n-grams in the model output compared to the reference text, with higher scores indicating better overlap. ROUGE scores measure both precision and recall, with F1 being the harmonic mean of both. BERTScore, on the other hand, measures semantic similarity between the generated and reference texts using contextual embeddings from BERT.

- **BLEU-1**: Single word overlap
- **BLEU-2/3/4**: Overlap of 2/3/4-word phrases
- **ROUGE-1**: Single word overlap (with recall)
- **ROUGE-2**: Bigram overlap
- **ROUGE-L**: Longest common subsequence
- **BERTScore**: Semantic similarity (Precision, Recall, F1) based on BERT embeddings. Higher F1 indicates better semantic alignment.

Higher scores indicate better alignment with the expected output, suggesting the model is producing responses that more closely match the desired therapeutic style and content. BERTScore often provides a more nuanced evaluation than n-gram based metrics alone.
