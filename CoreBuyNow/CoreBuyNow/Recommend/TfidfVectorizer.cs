namespace CoreBuyNow.Recommend;

public class TfidfVectorizer
{
    private List<string> _corpus = new();
    private Dictionary<string, int> _vocabIndex = new();

    public void Fit(List<string> documents)
    {
        _corpus = documents;
        var vocab = new HashSet<string>();

        foreach (var doc in documents)
        {
            foreach (var token in Tokenize(doc))
                vocab.Add(token);
        }
        _vocabIndex = vocab.Select((term, idx) => new { term, idx })
            .ToDictionary(x => x.term, x => x.idx);
    }

    public double[] Transform(string document)
    {
        var tokens = Tokenize(document);
        var tf = new Dictionary<string, int>();

        foreach (var token in tokens)
        {
            if (!tf.ContainsKey(token)) tf[token] = 0;
            tf[token]++;
        }

        var tfidf = new double[_vocabIndex.Count];

        foreach (var token in tf)
        {
            if (!_vocabIndex.ContainsKey(token.Key)) continue;

            int index = _vocabIndex[token.Key];
            double tfVal = (double)token.Value / tokens.Count;
            double idfVal = Math.Log((double)_corpus.Count / (1 + _corpus.Count(d => Tokenize(d).Contains(token.Key))));
            tfidf[index] = tfVal * idfVal;
        }

        return tfidf;
    }

    private List<string> Tokenize(string input)
    {
        return input.ToLower().Split(new[] { ' ', ',', ':', ';', '-', '_', '/', '.', '(', ')', '\n' }, StringSplitOptions.RemoveEmptyEntries)
            .Where(s => s.Length > 1).ToList();
    }
}