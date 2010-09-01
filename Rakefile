task :default => [:min, :doc]

task :min do
  source_file = "matrix.js"
  version = "0.0.0"

  File.foreach(source_file) do |line|
    if line =~ /Matrix\.js v(\d+\.\d+\.\d+)/
      version = $1
      break
    end
  end

  puts `java -jar yuicompressor-2.4.2.jar #{source_file} > matrix-#{version}.min.js`
end

task :doc do
  puts `java -jar jsdoc-toolkit/jsrun.jar jsdoc-toolkit/app/run.js -c=jsdoc.conf`
end
