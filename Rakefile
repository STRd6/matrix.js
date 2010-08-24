task :default => [:min, :doc]

task :min do
  puts `java -jar yuicompressor-2.4.2.jar matrix.js > matrix.min.js`
end

task :doc do
  puts `java -jar jsdoc-toolkit/jsrun.jar jsdoc-toolkit/app/run.js -c=jsdoc.conf`
end
