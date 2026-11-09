import type { DiaFamiliar } from '../devocionalFamiliar';

export type ReferenciaAbnt = NonNullable<NonNullable<DiaFamiliar['leituraAutor']>['abnt']>;

/* Referências ABNT (NBR 6023) dos livros recomendados no devocional familiar.
   Cada chave é um trecho do campo `obra` em leituraAutor; a referência cita a edição original. */
export const REFERENCIAS_ABNT: [chave: string, ref: ReferenciaAbnt][] = [
  ['O Significado do Casamento', { autores: 'KELLER, Timothy; KELLER, Kathy.', titulo: 'The meaning of marriage', complemento: ': facing the complexities of commitment with the wisdom of God. New York: Dutton, 2011.' }],
  ['Os Deveres dos Pais', { autores: 'RYLE, John Charles.', titulo: 'The duties of parents', complemento: '. [S. l.: s. n.], 1888.' }],
  ['Married for God', { autores: 'ASH, Christopher.', titulo: 'Married for God', complemento: ': making your marriage the best it can be. Nottingham: Inter-Varsity Press, 2007.' }],
  ['Pastoreando o Coração da Criança', { autores: 'TRIPP, Tedd.', titulo: "Shepherding a child's heart", complemento: '. Wapwallopen: Shepherd Press, 1995.' }],
  ['Casamento Temporário', { autores: 'PIPER, John.', titulo: 'This momentary marriage', complemento: ': a parable of permanence. Wheaton: Crossway, 2009.' }],
  ['Deus, Casamento e Família', { autores: 'KÖSTENBERGER, Andreas J.; JONES, David W.', titulo: 'God, marriage, and family', complemento: ': rebuilding the biblical foundation. 2. ed. Wheaton: Crossway, 2010.' }],
  ['Give Them Grace', { autores: 'FITZPATRICK, Elyse; THOMPSON, Jessica.', titulo: 'Give them grace', complemento: ': dazzling your kids with the love of Jesus. Wheaton: Crossway, 2011.' }],
  ['What Did You Expect?', { autores: 'TRIPP, Paul David.', titulo: 'What did you expect?', complemento: ': redeeming the realities of marriage. Wheaton: Crossway, 2010.' }],
  ['Peacemaking for Families', { autores: 'SANDE, Ken; RAABE, Tom.', titulo: 'Peacemaking for families', complemento: ': a biblical guide to managing conflict in your home. Wheaton: Tyndale House, 2002.' }],
  ['A Church in the House', { autores: 'HENRY, Matthew.', titulo: 'A church in the house', complemento: ': a sermon. London: [s. n.], 1704.' }],
  ['Relationships: A Mess Worth Making', { autores: 'LANE, Timothy S.; TRIPP, Paul David.', titulo: 'Relationships', complemento: ': a mess worth making. Greensboro: New Growth Press, 2006.' }],
  ['Guerra de Palavras', { autores: 'TRIPP, Paul David.', titulo: 'War of words', complemento: ': getting to the heart of your communication struggles. Phillipsburg: P&R Publishing, 2000.' }],
  ['Family Worship (Culto Doméstico)', { autores: 'BEEKE, Joel R.', titulo: 'Family worship', complemento: '. Grand Rapids: Reformation Heritage Books, 2002.' }],
  ['A Família Cristã', { autores: 'BAVINCK, Herman.', titulo: 'The Christian family', complemento: '. Tradução de Nelson D. Kloosterman. Grand Rapids: Christian\'s Library Press, 2012.' }],
  ['The Godly Home', { autores: 'BAXTER, Richard.', titulo: 'The godly home', complemento: '. Edição de Randall J. Pederson. Wheaton: Crossway, 2010.' }],
  ['Family Worship (Culto em Família)', { autores: 'WHITNEY, Donald S.', titulo: 'Family worship', complemento: ': in the Bible, in history, and in your home. Wheaton: Crossway, 2016.' }],
  ['Família Guiada pela Fé', { autores: 'BAUCHAM JR., Voddie.', titulo: 'Family driven faith', complemento: ': doing what it takes to raise sons and daughters who walk with God. Wheaton: Crossway, 2007.' }],
  ['Parenting: 14 Gospel Principles', { autores: 'TRIPP, Paul David.', titulo: 'Parenting', complemento: ': 14 gospel principles that can radically change your family. Wheaton: Crossway, 2016.' }],
  ['The Heart of Anger', { autores: 'PRIOLO, Lou.', titulo: 'The heart of anger', complemento: ': practical help for the prevention and cure of anger in children. Amityville: Calvary Press, 1997.' }],
  ['The Gospel Comes with a House Key', { autores: 'BUTTERFIELD, Rosaria Champagne.', titulo: 'The gospel comes with a house key', complemento: ': practicing radically ordinary hospitality in our post-Christian world. Wheaton: Crossway, 2018.' }],
  ['Age of Opportunity', { autores: 'TRIPP, Paul David.', titulo: 'Age of opportunity', complemento: ': a biblical guide to parenting teens. 2. ed. Phillipsburg: P&R Publishing, 2001.' }],
  ['When Sinners Say', { autores: 'HARVEY, Dave.', titulo: 'When sinners say "I do"', complemento: ': discovering the power of the gospel for marriage. Wapwallopen: Shepherd Press, 2007.' }],
  ['Adopted for Life', { autores: 'MOORE, Russell D.', titulo: 'Adopted for life', complemento: ': the priority of adoption for Christian families and churches. Wheaton: Crossway, 2009.' }],
  ['A Neglected Grace', { autores: 'HELOPOULOS, Jason.', titulo: 'A neglected grace', complemento: ': family worship in the Christian home. Fearn: Christian Focus, 2013.' }],
  ['A Praying Life', { autores: 'MILLER, Paul E.', titulo: 'A praying life', complemento: ': connecting with God in a distracting world. Colorado Springs: NavPress, 2009.' }],
  ['Training Hearts, Teaching Minds', { autores: 'MEADE, Starr.', titulo: 'Training hearts, teaching minds', complemento: ': family devotions based on the Shorter Catechism. Phillipsburg: P&R Publishing, 2000.' }],
  ['Dark Clouds, Deep Mercy', { autores: 'VROEGOP, Mark.', titulo: 'Dark clouds, deep mercy', complemento: ': discovering the grace of lament. Wheaton: Crossway, 2019.' }],
];

export function referenciaDaObra(obra: string): ReferenciaAbnt | undefined {
  return REFERENCIAS_ABNT.find(([chave]) => obra.includes(chave))?.[1];
}
