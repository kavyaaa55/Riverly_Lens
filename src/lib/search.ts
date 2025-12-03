export interface TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  data?: CompanySearchResult;
}

export interface CompanySearchResult {
  id: string;
  name: string;
  type?: string | null;
  logoUrl?: string | null;
}

export class Trie {
  private root: TrieNode;

  constructor() {
    this.root = {
      children: new Map(),
      isEndOfWord: false,
    };
  }


  // Insert a company into the trie

  insert(company: CompanySearchResult): void {
    const word = company.name.toLowerCase();
    let node = this.root;

    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, {
          children: new Map(),
          isEndOfWord: false,
        });
      }
      node = node.children.get(char)!;
    }

    node.isEndOfWord = true;
    node.data = company;
  }


  //  Search for companies with the given prefix

  search(prefix: string, limit: number = 10): CompanySearchResult[] {
    const lowerPrefix = prefix.toLowerCase();
    let node = this.root;

    // Navigate to the prefix node
    for (const char of lowerPrefix) {
      if (!node.children.has(char)) {
        return [];
      }
      node = node.children.get(char)!;
    }

    // Collect all words with this prefix
    const results: CompanySearchResult[] = [];
    this.collectWords(node, results, limit);

    return results;
  }


  //  Collect all words from a given node (DFS)
  //  recussive dfs 
  private collectWords(
    node: TrieNode,
    results: CompanySearchResult[],
    limit: number
  ): void {
    if (results.length >= limit) {
      return;
    }

    if (node.isEndOfWord && node.data) {
      results.push(node.data);
    }

    for (const child of node.children.values()) {
      this.collectWords(child, results, limit);
      if (results.length >= limit) {
        break;
      }
    }
  }


  //  Build trie from array of companies

  static buildFromCompanies(companies: CompanySearchResult[]): Trie {
    const trie = new Trie();
    companies.forEach((company) => trie.insert(company));
    return trie;
  }
}

