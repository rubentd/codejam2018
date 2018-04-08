'use strict'
process.stdin.resume();
process.stdin.setEncoding('utf8');

let input = '';

process.stdin.on('data', (chunk) => {
	input += chunk;
});

process.stdin.on('end', () => { main(input) });

const main = (input) => {
  const lines = input.split('\n');
  const N = parseInt(lines[0]);

  lines.forEach(function(line, i) {
    if(i == 0 || i > N) {
      return;
    }
    const parts = line.split(' ');
    const allowedDamage = parseInt(parts[0]);
    const sequence = parts[1];
    
    const solution = solve(allowedDamage, sequence);
    console.log(`Case #${i}: ${solution}`);
  });

  process.exit(0)
}

const solve = (allowedDamage, sequence) => {

  if(minimumDamage(sequence) > allowedDamage) {
    return 'IMPOSSIBLE';
  };

  let swaps = 0;
  while(calculateDamage(sequence) > allowedDamage && isSwappable(sequence)) {
    sequence = swap(sequence);
    swaps++;
  }
  
  return swaps;
}

// Detect if sequence can be swappable to reduce damage
const isSwappable = (sequence) => {
  return sequence.indexOf('CS') != -1;
}

const calculateDamage = (sequence) => {
  const code = sequence.split('');
  let totalDamage = 0;
  let currentDamage = 1;
  code.forEach(function(i) {
    if (i === 'S') {
      totalDamage += currentDamage;
    } else if (i === 'C') {
      currentDamage *= 2;
    }
  });
  return totalDamage;
}

const minimumDamage = sequence => (
  sequence.split('S').length - 1
);

const swap = (sequence) => {
  const code = sequence.split('');
  let swapped = false;
  let i = code.length - 1;
  while(!swapped && i > 0) {
    if (code[i - 1] === 'C' && code[i] === 'S') {
      code[i] = 'C';
      code[i - 1] = 'S';
      swapped = true;
    }
    i--;
  }
  return code.join('');
}