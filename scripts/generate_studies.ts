
import { BIBLE_DATA } from '../src/data/bibleData';
import * as fs from 'fs';
import * as path from 'path';

const TEMPLATE = `--- INTRODUÇÃO ---
VISÃO: Estudo expositivo focado na estrutura literária e teológica de {{REFERENCE}}.
OBJETIVO: Revelar o propósito central do autor inspirado e as conexões cristológicas.

1. INTERLINEAR
[Ref] Texto: Conteúdo...
Explicação: Análise detalhada do texto original.

2. MORFOLÓGICO
Termo (Transliteração): Significado
Explicação: Estudo léxico e gramatical.

3. QUIÁSTICO
[A] Bloco...
[B] Centro...
[A'] Bloco correspondente...
Explicação: Simetria e centro retórico.

4. SINTÁTICO
[Ref] Sujeito: ... | Verbos: ...
Explicação: Lógica gramatical e ação.

5. SEMÂNTICO
[Ref] Ideia: ...
Explicação: Fluxo de significado.

6. PROGRESSIVO
Etapa 1 [Ref]: ...
Etapa 2 [Ref]: ...
Explicação: Desenvolvimento narrativo ou argumentativo.

7. INTENSIFICAÇÃO
[Ref] Foco: ...
Explicação: Níveis de ênfase.

8. ESPACIAL
[Ref] Esfera: ...
Explicação: Contexto geográfico ou espiritual.

9. ACESSO
[Ref] Permissão: ...
Explicação: Autoridade e mediação.

10. RELACIONAL
[Ref] Status: ...
Explicação: Vínculos e alianças.

11. CRISTOLÓGICO
[Ref] Conexão: ...
Explicação: O aponte para Jesus Cristo.

12. SISTEMÁTICO
[Ref] Doutrina: ...
Explicação: Aplicação teológica geral.

13. TENSÃO
[Ref] Estado: ...
Explicação: Movimentos de tensividade.

14. REPETIÇÃO
[Ref] Padrão: ...
Explicação: Temas recorrentes.

15. CAUSA E EFEITO
[Ref] Ação: ... -> Consequência: ...
Explicação: Lógica processual.

16. APOLOGÉTICO
[Ref] Tema: ... | Heresias/Combate: ...
Explicação: Defesa da fé.

17. PERGUNTAS
Observação [Ref]:
 - Pergunta?
Interpretação [Ref]:
 - Pergunta?
Aplicação [Ref]:
 - Pergunta?
Explicação: Diálogo com o texto.

18. AUTORAL
Voz [Label - Ref]:
  Autor: "Comentário"
Explicação: Contribuições teológicas.

19. HOMILÉTICO
Tema Central: O Propósito em {{REFERENCE}}
I [Ref]: Ponto 1
II [Ref]: Ponto 2
III [Ref]: Ponto 3
Explicação: Esboço para exposição.

20. PASTORAL
Pastoral [Ref]:
  Adultos: Aplicação prática.
  Jovens: Direcionamento.
  Igreja: Visão corporativa.
Explicação Final: A santidade na prática diária.

--- CONCLUSÃO ---
Síntese: Resumo teológico do capítulo.
Frase Final: Aplicação transformadora.
`;

function normalizeLivroId(livroId: string): string {
  return livroId
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

async function generate() {
  const baseDir = path.join(process.cwd(), 'public', 'estudos');
  let generatedCount = 0;
  let totalCount = 0;
  
  for (const livro of BIBLE_DATA.livros) {
    const testamentoDir = path.join(baseDir, livro.testamento);
    if (!fs.existsSync(testamentoDir)) {
      fs.mkdirSync(testamentoDir, { recursive: true });
    }
    
    const normalizedName = normalizeLivroId(livro.id);
    
    for (const capitulo of livro.capitulos) {
      const fileName = `${normalizedName}${capitulo.numero}.txt`;
      const filePath = path.join(testamentoDir, fileName);
      
      const reference = `${livro.nome} ${capitulo.numero}`;
      const content = TEMPLATE.replace(/{{REFERENCE}}/g, reference);
      
      // Check if file exists and has content beyond just a few lines
      let shouldWrite = true;
      if (fs.existsSync(filePath)) {
        const existingContent = fs.readFileSync(filePath, 'utf8');
        // Update to include full template if it's the old short format
        if (existingContent.length > 1000 && existingContent.includes('20. PASTORAL')) {
          shouldWrite = false; 
        }
      }
      
      if (shouldWrite) {
        fs.writeFileSync(filePath, content);
        generatedCount++;
      }
      totalCount++;
    }
  }
  console.log(`Summary: Generated/Updated ${generatedCount} out of ${totalCount} files.`);
}

generate().catch(console.error);
