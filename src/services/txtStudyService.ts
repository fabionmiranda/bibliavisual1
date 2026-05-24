import { EstudoCapitulo } from '../types/bible';

/**
 * Service to load and parse study content from local .txt files
 */
export async function getStudyFromTxt(testamento: string, livroId: string, capitulo: number): Promise<EstudoCapitulo | null> {
  try {
    // Normalizing name for filename
    const normalizedLivro = livroId
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
    
    const simpleLivro = livroId.replace(/-/g, '');
    const simpleLivroCap = simpleLivro.charAt(0).toUpperCase() + simpleLivro.slice(1);
    
    // Variations to try
    const pathsToTry = [
      `/estudos/${testamento}/${normalizedLivro}${capitulo}.txt`,
      `/estudos/${testamento}/${normalizedLivro}${capitulo < 10 ? `0${capitulo}` : capitulo}.txt`,
      `/estudos/${testamento.toLowerCase()}/${normalizedLivro}${capitulo}.txt`,
      `/estudos/${testamento}/${livroId}${capitulo}.txt`,
      `/estudos/${testamento.toLowerCase()}/${livroId}${capitulo}.txt`,
      `/estudos/${testamento}/${simpleLivroCap}${capitulo}.txt`,
      `/${livroId}${capitulo}.txt`,
      `/${simpleLivro}${capitulo}.txt`,
      `/estudos/${testamento}/${normalizedLivro}.txt`,
      `/${normalizedLivro}${capitulo}.txt`
    ];

    let text = null;
    let successfulPath = '';
    
    for (const path of pathsToTry) {
        try {
            const response = await globalThis.fetch(path);
            if (response.ok) {
                text = await response.text();
                successfulPath = path;
                break;
            }
        } catch (e) {
            // Continue to next path
        }
    }
    
    if (!text) return null;
    
    return parseStudyTxt(text, `${normalizedLivro} ${capitulo}`);
  } catch (error) {
    console.error('Error loading TXT study:', error);
    return null;
  }
}

export function parseStudyTxt(text: string, reference: string): EstudoCapitulo {
  const sections = text.split(/\n(?=\d+\.|---\s*[A-ZÇÃÕ]+\s*---)/);
  
  // Initialize with empty structure
  const estudio: EstudoCapitulo = {
    referencia: reference,
    fundamento: { objetivo: '', fluxoTeologico: '', proposito: '' },
    versos: [],
    quiasmo: { blocos: [], explicacao: '' },
    centroTeologico: { versiculos: '', explicacao: '', verbosRepetidos: [], mensagemCentral: '', sintese: [] },
    diagramas: { sintaticoBlocos: '', semantico: '', integrado: '' },
    eixoCristologico: { problema: '', limitacao: '', perguntaCentral: '', cristo: { cumpre: '', substitui: '', aperfecoia: '', consuma: '' } },
    aplicacoes: { vidaEspiritual: '', santidade: '', igreja: '', adoracao: '' },
    homiletica: { titulo: '', palavraChave: '', perguntaCentral: '', pontos: [] },
    conclusao: { sintese: '', fraseFinal: '' },
    diagramas20: {
      interlinear: { descricao: 'Interlinear BHS', secoes: [], explicacao: '' },
      morfologicoLexical: { descricao: 'Morfologia e Léxico', termos: [], explicacao: '' },
      quiastico: { descricao: 'Estrutura Quiástica', blocos: [], explicacao: '' },
      sintatico: { descricao: 'Análise Sintática', blocos: [], explicacao: '' },
      semantico: { descricao: 'Análise Semântica', fluxo: [], explicacao: '' },
      progressivo: { descricao: 'Progressão do Texto', etapas: [], explicacao: '' },
      intensificacao: { descricao: 'Níveis de Intensidade', niveis: [], explicacao: '' },
      espacial: { descricao: 'Dimensões Espaciais', esferas: [], explicacao: '' },
      acesso: { descricao: 'Dinâmicas de Acesso', permissoes: [], explicacao: '' },
      relacional: { descricao: 'Vínculos Relacionais', vinculos: [], explicacao: '' },
      cristologico: { descricao: 'Aponte Cristocêntrico', conexoes: [], explicacao: '' },
      sistematico: { descricao: 'Teologia Sistemática', doutrinas: [], explicacao: '' },
      tensao: { descricao: 'Movimentos de Tensividade', movimento: [], explicacao: '' },
      repeticao: { descricao: 'Padrões de Repetição', padroes: [], explicacao: '' },
      causaEfeito: { descricao: 'Lógica Processual', logica: [], explicacao: '' },
      apologetico: { descricao: 'Defesa e Contraponto', confrontos: [], explicacao: '' },
      perguntas: { descricao: 'Perguntas ao Texto', secoes: [], explicacao: '' },
      autoral: { descricao: 'Vozes Autorais e Fontes', contribuicoes: [], explicacao: '' },
      homiletico: { descricao: 'Esboço Expositivo', temaCentral: '', esboço: [], explicacao: '' },
      pastoralPratico: { descricao: 'Direcionamento Pastoral', direcionamentos: [], explicacao: '' },
      antropologico: { descricao: 'Diagrama Antropológico', secoes: [], explicacao: '' },
      familiar: { descricao: 'Diagrama Familiar', secoes: [], explicacao: '' },
      trinitario: { descricao: 'Diagrama Trinitário', secoes: [], explicacao: '' }
    }
  };

  sections.forEach(section => {
    const lines = section.trim().split('\n');
    const firstLine = lines[0].trim().toUpperCase();

    // Headers
    if (firstLine.includes('INTRODUÇÃO')) {
      estudio.diagramas20!.introducao = {
          texto: lines.find(l => l.toUpperCase().startsWith('VISÃO:'))?.split(':', 2)[1].trim() || '',
          objetivo: lines.find(l => l.toUpperCase().startsWith('OBJETIVO:'))?.split(':', 2)[1].trim() || ''
      };
    } else if (firstLine.includes('CONCLUSÃO')) {
        estudio.conclusao.sintese = lines.find(l => l.includes('Síntese:'))?.split(':', 2)[1].trim() || '';
        estudio.conclusao.fraseFinal = lines.find(l => l.includes('Frase Final:'))?.split(':', 2)[1].trim() || '';
    }
    
    // Diagramas 1-23
    const d = estudio.diagramas20!;
    
    if (firstLine.includes('INTERLINEAR')) {
      let i = 1;
      while (i < lines.length) {
        let l = lines[i].trim();
        if (l === '' || l.startsWith('Explicação:')) {
          if (l.startsWith('Explicação:')) d.interlinear.explicacao = l.replace('Explicação:', '').trim();
          i++;
          continue;
        }

        // Try single line first [Ref] Hebraico: ... | Transliteração: ... | Tradução: ...
        const match = l.match(/\[(.*?)\]\s*Hebraico:\s*(.*?)\s*\|\s*Transliteração:\s*(.*?)\s*\|\s*Tradução:\s*(.*)/i);
        if (match) {
          d.interlinear.secoes.push({ 
            ref: match[1], 
            hebraico: match[2].trim(), 
            transliteracao: match[3].trim(), 
            traducao: match[4].trim() 
          });
          i++;
        } else if (i + 3 < lines.length) {
          // Fallback to 4-line block format
          const refLine = l;
          const hebLine = lines[i+1].trim();
          const traLine = lines[i+2].trim();
          const modLine = lines[i+3].trim();
          
          d.interlinear.secoes.push({ 
            ref: refLine, 
            hebraico: hebLine, 
            transliteracao: traLine, 
            traducao: modLine 
          });
          i += 4;
        } else {
          i++;
        }
      }
    } else if (firstLine.includes('MORFOLÓGICO')) {
      lines.forEach(l => {
        const firstColonIndex = l.indexOf(':');
        if (firstColonIndex !== -1 && !l.startsWith('Explicação:')) {
          const termPart = l.substring(0, firstColonIndex).trim();
          const signPartFull = l.substring(firstColonIndex + 1).trim();
          
          // Extract [Ref] if present at the end
          const refMatch = signPartFull.match(/(.*)\[(.*?)\]/);
          const signPart = refMatch ? refMatch[1].trim() : signPartFull;
          const ref = refMatch ? refMatch[2].trim() : undefined;

          // Match "Termo (Transliteração)" or just "Termo"
          const transMatch = termPart.match(/(.*?)\s*\((.*?)\)/);
          d.morfologicoLexical.termos.push({
            termo: transMatch ? transMatch[1].trim() : termPart,
            transliteracao: transMatch ? transMatch[2].trim() : '',
            significado: signPart,
            campo: 'Léxico',
            ref: ref
          });
        }
        if (l.startsWith('Explicação:')) d.morfologicoLexical.explicacao = l.replace('Explicação:', '').trim();
      });
    } else if (firstLine.includes('QUIÁSTICO')) {
      lines.forEach(l => {
        const match = l.match(/\[(.*?)\]\s*(.*):\s+(.*)/);
        if (match) {
          d.quiastico.blocos.push({ 
            label: match[1], 
            ref: match[2].trim(), 
            conteudo: match[3].trim()
          });
        }
        if (l.startsWith('Explicação:')) d.quiastico.explicacao = l.replace('Explicação:', '').trim();
      });
    } else if (firstLine.includes('SINTÁTICO')) {
      lines.forEach(l => {
        const match = l.match(/\[(.*?)\]\s*Sujeito:\s*(.*?)\s*\|\s*Verbos:\s*(.*)/i);
        if (match) {
            const verbParts = match[3].split('|').map(p => p.trim());
            const verbos = verbParts[0];
            let rest: any = {};
            verbParts.slice(1).forEach(p => {
                if (p.startsWith('Destinatário:')) rest.destinatario = p.replace('Destinatário:', '').trim();
                if (p.startsWith('Objeto:')) rest.objeto = p.replace('Objeto:', '').trim();
                if (p.startsWith('Verbo passivo:')) rest.verboPassivo = p.replace('Verbo passivo:', '').trim();
            });
            d.sintatico.blocos.push({ label: 'S', ref: match[1], sujeito: match[2], verbos: verbos, ...rest });
        }
        if (l.startsWith('Explicação:')) d.sintatico.explicacao = l.replace('Explicação:', '').trim();
      });
    } else if (firstLine.includes('SEMÂNTICO')) {
      lines.forEach(l => {
        const match = l.match(/\[(.*?)\] (.*)/);
        if (match) d.semantico.fluxo.push({ ref: match[1], ideia: match[2] });
        else if (l.startsWith('Ideia:')) d.semantico.fluxo.push({ ref: 'Cap', ideia: l.replace('Ideia:', '').trim() });
        
        if (l.startsWith('Explicação:')) d.semantico.explicacao = l.replace('Explicação:', '').trim();
      });
    } else if (firstLine.includes('PROGRESSIVO')) {
        lines.forEach(l => {
            const match = l.match(/Etapa \d+\s*(?:\[(.*?)\])?:\s*(.*)/i);
            if (match) {
              d.progressivo.etapas.push({ 
                ref: match[1] || '---', 
                acao: match[2] 
              });
            }
            if (l.startsWith('Explicação:')) d.progressivo.explicacao = l.replace('Explicação:', '').trim();
        });
    } else if (firstLine.includes('INTENSIFICAÇÃO')) {
        lines.forEach(l => {
            const match = l.match(/\[(.*?)\] Foco: (.*)/);
            if (match) d.intensificacao.niveis.push({ ref: match[1], foco: match[2] });
            if (l.startsWith('Explicação:')) d.intensificacao.explicacao = l.replace('Explicação:', '').trim();
        });
    } else if (firstLine.includes('ESPACIAL')) {
        lines.forEach(l => {
            const match = l.match(/\[(.*?)\] Esfera: (.*)/);
            if (match) d.espacial.esferas.push({ ref: match[1], esfera: match[2] });
            if (l.startsWith('Explicação:')) d.espacial.explicacao = l.replace('Explicação:', '').trim();
        });
    } else if (firstLine.includes('ACESSO')) {
        lines.forEach(l => {
            const match = l.match(/\[(.*?)\] Permissão: (.*)/);
            if (match) d.acesso.permissoes.push({ ref: match[1], acao: match[2] });
            if (l.startsWith('Explicação:')) d.acesso.explicacao = l.replace('Explicação:', '').trim();
        });
    } else if (firstLine.includes('RELACIONAL')) {
        lines.forEach(l => {
            const match = l.match(/\[(.*?)\] Status: (.*)/);
            if (match) d.relacional.vinculos.push({ ref: match[1], status: match[2] });
            if (l.startsWith('Explicação:')) d.relacional.explicacao = l.replace('Explicação:', '').trim();
        });
    } else if (firstLine.includes('CRISTOLÓGICO')) {
        lines.forEach(l => {
            const match = l.match(/\[(.*?)\] Conexão: (.*)/);
            if (match) d.cristologico.conexoes.push({ ref: match[1], apontaPara: match[2] });
            if (l.startsWith('Explicação:')) d.cristologico.explicacao = l.replace('Explicação:', '').trim();
        });
    } else if (firstLine.includes('SISTEMÁTICO')) {
        lines.forEach(l => {
            const match = l.match(/\[(.*?)\] Doutrina: (.*)/);
            if (match) d.sistematico.doutrinas.push({ ref: match[1], doutrina: match[2] });
            if (l.startsWith('Explicação:')) d.sistematico.explicacao = l.replace('Explicação:', '').trim();
        });
    } else if (firstLine.includes('TENSÃO')) {
        lines.forEach(l => {
            const match = l.match(/\[(.*?)\] Estado: (.*)/);
            if (match) d.tensao.movimento.push({ ref: match[1], estado: match[2] });
            if (l.startsWith('Explicação:')) d.tensao.explicacao = l.replace('Explicação:', '').trim();
        });
    } else if (firstLine.includes('REPETIÇÃO')) {
        lines.forEach(l => {
            const match = l.match(/\[(.*?)\] Padrão: (.*)/);
            if (match) d.repeticao.padroes.push({ ref: match[1], tema: match[2] });
            if (l.startsWith('Explicação:')) d.repeticao.explicacao = l.replace('Explicação:', '').trim();
        });
    } else if (firstLine.includes('CAUSA E EFEITO')) {
        lines.forEach(l => {
            const match = l.match(/\[(.*?)\] Ação: (.*?) -> Consequência: (.*)/);
            if (match) d.causaEfeito.logica.push({ ref: match[1], acao: match[2], consequencia: match[3] });
            if (l.startsWith('Explicação:')) d.causaEfeito.explicacao = l.replace('Explicação:', '').trim();
        });
    } else if (firstLine.includes('APOLOGÉTICO')) {
      lines.forEach(l => {
        const match = l.match(/\[(.*?)\].*?Tema:\s*(.*?)\s*\|\s*Heresias\/Combate:\s*(.*)/i);
        if (match) {
          d.apologetico.confrontos.push({ 
            ref: match[1], 
            tema: match[2], 
            heresias: match[3].split(',').map(h => h.trim()) 
          });
        }
        if (l.startsWith('Explicação:')) d.apologetico.explicacao = l.replace('Explicação:', '').trim();
      });
    } else if (firstLine.includes('PERGUNTAS')) {
        let currentSecao: any = null;
        lines.forEach(l => {
            const headerMatch = l.match(/(.*?) \[(.*?)\]:/);
            if (headerMatch && !l.startsWith(' -')) {
                currentSecao = { titulo: headerMatch[1], ref: headerMatch[2], perguntas: [] };
                d.perguntas.secoes.push(currentSecao);
            } else if (l.startsWith(' -') && currentSecao) {
                currentSecao.perguntas.push(l.replace(' -', '').trim());
            }
            if (l.startsWith('Explicação:')) d.perguntas.explicacao = l.replace('Explicação:', '').trim();
        });
    } else if (firstLine.includes('AUTORAL')) {
        let currentContr: any = null;
        lines.forEach(l => {
            const headerMatch = l.match(/(.*?) \[(.*?) - (.*?)\]:/);
            if (headerMatch && !l.startsWith('  ')) {
                currentContr = { titulo: headerMatch[1], label: headerMatch[2], ref: headerMatch[3], autores: [] };
                d.autoral.contribuicoes.push(currentContr);
            } else if (l.startsWith('  ') && currentContr) {
                const authorMatch = l.match(/\s+(.*?):\s*"(.*)"/);
                if (authorMatch) currentContr.autores.push({ nome: authorMatch[1], comentario: authorMatch[2] });
            }
            if (l.startsWith('Explicação:')) d.autoral.explicacao = l.replace('Explicação:', '').trim();
        });
    } else if (firstLine.includes('HOMILÉTICO')) {
        lines.forEach(l => {
            if (l.startsWith('Tema Central:')) d.homiletico.temaCentral = l.replace('Tema Central:', '').trim();
            const match = l.match(/([A-Z\d-]+)\s*\[(.*?)\]:\s*(.*)/);
            if (match) d.homiletico.esboço.push({ label: match[1], ref: match[2], ponto: match[3] });
            if (l.startsWith('Explicação:')) d.homiletico.explicacao = l.replace('Explicação:', '').trim();
        });
    } else if (firstLine.includes('PASTORAL')) {
        let currentDirect: any = null;
        lines.forEach(l => {
            const headerMatch = l.match(/(.*?) \[(.*?)\]:/) || l.match(/(.*?) \[(.*?)\][—–\-]/);
            if (headerMatch && !l.startsWith('  ')) {
                currentDirect = { titulo: headerMatch[1].trim(), ref: headerMatch[2].trim(), adultos: '', jovens: '', igreja: '' };
                d.pastoralPratico.direcionamentos.push(currentDirect);
            } else if (l.includes('Adultos:') && currentDirect) {
                currentDirect.adultos = l.split('Adultos:')[1].trim();
            } else if (l.includes('Jovens:') && currentDirect) {
                currentDirect.jovens = l.split('Jovens:')[1].trim();
            } else if (l.includes('Igreja:') && currentDirect) {
                currentDirect.igreja = l.split('Igreja:')[1].trim();
            }
            if (l.startsWith('Explicação Final:') || l.startsWith('Explicação:')) {
                d.pastoralPratico.explicacao = l.replace(/Explicação( Final)?:/, '').trim();
            }
        });
    } else if (firstLine.includes('ANTROPOLÓGICO')) {
        let currentSecao: any = null;
        lines.forEach(l => {
            const headerMatch = l.match(/(.*?) [—–\-] (.*?)$/);
            if (headerMatch) {
                currentSecao = { ref: headerMatch[1].trim(), titulo: headerMatch[2].trim(), analises: [] };
                d.antropologico!.secoes.push(currentSecao);
            } else if (l.includes(': →') && currentSecao) {
                const [nivel, conteudo] = l.split(': →').map(s => s.trim());
                currentSecao.analises.push({ nivel, conteudo });
            } else if (l.startsWith('Explicação:')) {
                d.antropologico!.explicacao = l.replace('Explicação:', '').trim();
            }
        });
    } else if (firstLine.includes('FAMILIAR')) {
        let currentItem: any = null;
        lines.forEach(l => {
            const refMatch = l.match(/^(Lv [\d:–\- \w]+)$/);
            if (refMatch) {
                currentItem = { ref: refMatch[1], familia: '', fluxo: '' };
                d.familiar!.secoes.push(currentItem);
            } else if (currentItem && l.startsWith('→')) {
                currentItem.fluxo = l.replace('→', '').trim();
            } else if (l.includes('Família:') && currentItem) {
                currentItem.familia = l.replace('Família:', '').trim();
            } else if (l.startsWith('Explicação:')) {
                d.familiar!.explicacao = l.replace('Explicação:', '').trim();
            }
        });
    } else if (firstLine.includes('TRINITÁRIO')) {
        let currentSec: any = null;
        lines.forEach(l => {
            const mainMatch = l.match(/^(Lv [\d:–\- \w]+)$/);
            const acaoMatch = l.match(/^(.*?) → (.*)$/);
            
            if (mainMatch) {
                currentSec = { ref: mainMatch[1], titulo: '', fluxo: '', pai: '', filho: '', espirito: '' };
                d.trinitario!.secoes.push(currentSec);
            } else if (acaoMatch) {
                if (!currentSec) {
                    currentSec = { ref: '---', titulo: acaoMatch[1].trim(), fluxo: acaoMatch[2].trim(), pai: '', filho: '', espirito: '' };
                    d.trinitario!.secoes.push(currentSec);
                } else {
                    currentSec.titulo = acaoMatch[1].trim();
                    currentSec.fluxo = acaoMatch[2].trim();
                }
            } else if (l.includes('(Pai') && currentSec) {
                const parts = l.split('|').map(s => s.trim());
                parts.forEach(p => {
                    if (p.includes('Pai')) currentSec.pai = p.replace('(Pai', '').replace(')', '').replace('Pai', '').replace(':', '').trim();
                    if (p.includes('Filho')) currentSec.filho = p.replace('Filho', '').replace(')', '').replace(':', '').trim();
                    if (p.includes('Espírito')) currentSec.espirito = p.replace('Espírito', '').replace(')', '').replace(':', '').trim();
                });
            } else if (l.startsWith('Explicação:')) {
                d.trinitario!.explicacao = l.replace('Explicação:', '').trim();
            }
        });
    }
  });

  return estudio;
}

